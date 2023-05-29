//module model
/*attribute: 
-reference
-title
-semester
*/
require("../globals");
const { resolve } = require("@truffle/contract/lib/promievent");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Evaluation = require("./evaluation.model").Evaluation;
const Student = require("./student.model");
const moduleSchema = mongoose.Schema({
  title: String,
  semester: Number,
  professor: {
    type: String,
    ref: "professor",
  },
  filiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "filiere",
  },
});
var Module = mongoose.model("module", moduleSchema);

//export model functions
module.exports = {
  addNew,
  getAll,
  getOne,
  deleteOne,
  setTitle,
  setSemester,
  getByFiliere,
  getCustom,
  update,
  getStudentsNoValide,
  getStudentsValide,
  Module,
};

//insert function
function addNew(title, semester, professor, filiere) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then((res) => {
        let newModule = new Module({
          title: title,
          semester: semester,
          professor: professor,
          filiere: filiere,
        });

        newModule
          .save()
          .then((res) => {
            mongoose.disconnect();
            resolve(res);
          })
          .catch((err) => {
            mongoose.disconnect();
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getStudentsNoValide(id) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true }).then(() => {
      Evaluation.aggregate([
        {
          $lookup: {
            from: "students",
            localField: "referenceStudent",
            foreignField: "reference",
            as: "student",
          },
        },
        {
          $lookup: {
            from: "modules",
            localField: "referenceModule",
            foreignField: "_id",
            as: "module",
          },
        },
        {
          $match: {
            referenceModule: new ObjectId(id),
            $expr: {
              $and: [
                {
                  $gte: ["$student.currentSemester", "$module.semester"],
                },
              ],
            },
            grade: { $lt: 10 },
          },
        },
      ])
        .then((data) => {
          mongoose.disconnect();
          resolve(data);
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err.message);
        });
    });
  });
}
function getStudentsValide(id) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true }).then(() => {
      Evaluation.aggregate([
        {
          $lookup: {
            from: "students",
            localField: "referenceStudent",
            foreignField: "reference",
            as: "student",
          },
        },
        {
          $lookup: {
            from: "modules",
            localField: "referenceModule",
            foreignField: "_id",
            as: "module",
          },
        },
        {
          $lookup: {
            from: "diplomes",
            let: { refStudent: "$referenceStudent" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$$refStudent", "$student"] },
                  state: { $eq: true },
                },
              },
            ],
            as: "diplomes",
          },
        },
        {
          $match: {
            referenceModule: new ObjectId(id),
            diplomes: { $size: 0 },
            $expr: {
              $and: [
                {
                  $gte: ["$student.currentSemester", "$module.semester"],
                },
              ],
            },
            grade: { $gte: 10 },
          },
        },
      ])
        .then((data) => {
          mongoose.disconnect();
          resolve(data);
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err.message);
        });
    });
  });
}
function getAll() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        // return Module.find({});
        return Module.aggregate([
          {
            $group: {
              _id: "$semester",
              modules: { $push: "$$ROOT" },
            },
          },
        ]);
      })
      .then((modules) => {
        mongoose.disconnect();
        resolve(modules);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function getOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Module.findOne({ _id: id });
      })
      .then((module) => {
        mongoose.disconnect();
        if (module) {
          resolve(module);
        } else {
          resolve(`Aucun module trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function getCustom(idFiliere, semester) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb)
      .then(() => {
        return Module.find({
          filiere: idFiliere,
          semester: semester,
        });
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
function getByFiliere(idFiliere) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb)
      .then(() => {
        return Module.aggregate([
          {
            $match: {
              filiere: idFiliere,
            },
          },
          {
            $group: {
              _id: "$semester",
              modules: { $push: "$$ROOT" },
            },
          },
        ]);
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// function getBySemester(semester) {
//   return new Promise((resolve, reject) => {
//     mongoose
//       .connect(urlDb)
//       .then(() => {
//         return Module.find({
//           semester: semester,
//         });
//       })
//       .then((data) => {
//         resolve(data);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

function deleteOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Module.findOneAndDelete({ _id: id });
      })
      .then((deletedModule) => {
        mongoose.disconnect();
        if (deletedModule) {
          resolve(deletedModule);
        } else {
          resolve(`Aucun module trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setTitle(id, label) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Module.findOneAndUpdate(
          { _id: id },
          { title: label },
          { new: true }
        );
      })
      .then((updatedModule) => {
        mongoose.disconnect();
        if (updatedModule) {
          resolve(updatedModule);
        } else {
          resolve(`Aucun module trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setSemester(id, semester) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Module.findOneAndUpdate(
          { _id: id },
          { semester: semester },
          { new: true }
        );
      })
      .then((updatedModule) => {
        mongoose.disconnect();
        if (updatedModule) {
          resolve(updatedModule);
        } else {
          resolve(`Aucun module trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}
function update(id, title, semester, professor, filiere) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Module.findOneAndUpdate(
          { _id: id },
          {
            title: title,
            semester: semester,
            professor: professor,
            filiere: filiere,
          },
          { new: true }
        );
      })
      .then((updatedModule) => {
        mongoose.disconnect();
        if (updatedModule) {
          resolve("le module e été modifier avec success.");
        } else {
          reject(`Aucun document trouvé`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}
