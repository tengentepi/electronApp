/*const bcrypt = require('bcrypt'); // Concerne uniquement les users pour leurs authentification
const jwt = require('jsonwebtoken');*/
/*const Patient = require('./model');*/
/*******************Appel express*****************/
//const express = require('express');
/*Fin appel express*/
import Patient from './model';
/*Appel du module express-hateoas-links*/
//const hateoasLinker = require('express-hateoas-links');

/*Utilisation du module express-hateoas-links */
//const app = express();
//app.use(hateoasLinker);


//***************FONCTIONS CRUD PATIENT*******************

//Création d'un patient - 1



// export const createPatient = (req, res, next) => {

//   const patient = new Patient({
//     name: req.body.name,
//     firstName: req.body.firstName,
//     birthDate: req.body.birthDate,
//     pieceNumber: req.body.pieceNumber,
//     gender: req.body.gender,
//     address: req.body.address,
//     typeOfPiece: req.body.typeOfPiece,
//     placeOfResidence: req.body.placeOfResidence,
//     phoneNumber: req.body.phoneNumber,
//     employer: req.body.employer,
//     electricityRelease: req.body.electricityRelease,
//     waterClearance: req.body.waterClearance,
//     nationality: req.body.nationality,
//     fatherFullName: req.body.fatherFullName,
//     motherFullName: req.body.motherFullName, 
//     registrationInfos: req.body.registrationInfos//16 eme champ
//     // registrationInfos: req.body.userId
//     //,imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     });
//    // const prestation = new prestation({
//    //   prestationDate : req.body.prestationDate
//   // });
// //************************************************ */

// //patient.insert({}).then(()=>{}).catch((error)=>{});






// //************************************************ */
//   patient.save().then(
//     () => {
//       res.status(201).json({
//         message: 'Patient saved successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// };
//Lecture d'un patient en foction de son identifiant

/*
exports.getOnePatient = (req, res, next) => {
  Patient.findOne({
    _id: req.params.id
  }).then(
    (Patient) => {
      res.status(200).json(Patient);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
*/
//Création d'un patient - 2
export const createPatient = (req, res, next) => {
  // const patientObject = JSON.parse(req.body.patient);
  Patient.findOne({
    patientId: req.body.patientId
  }).then(
    (patient) => {
      if(!patient){
        const newPatient = new Patient({
          patientId: req.body.patientId,
          name: req.body.name,
          firstName: req.body.firstName,
          birthDate: req.body.birthDate,
          pieceNumber: req.body.pieceNumber,
          typeOfPiece: req.body.typeOfPiece,
          gender: req.body.gender,
          address: req.body.address,
          placeOfResidence: req.body.placeOfResidence,
          phoneNumber: req.body.phoneNumber,
          employer: req.body.employer,
          electricityRelease: req.body.electricityRelease,
          waterClearance: req.body.waterClearance,
          nationality: req.body.nationality,
          fatherFullName: req.body.fatherFullName,
          motherFullName: req.body.motherFullName,
          conventionId: req.body.convention,
          registrationInfos: {
            userIds: req.body.user,
            registrationDate: req.body.registrationDate,
            centerIds: req.body.center
          }
          // $push:{
          //   "registrationInfos":{$each:[req.bosy.registrationInfos]}
          // }
        });
        newPatient.save().then(()=>{
          res.status(201).json({message: "New Patient created successfully !", patient: newPatient})
        }).catch((error)=>{
          res.status(400).json({error: error, message: 'Nouveau patient; echec création !'});
        });
      }
      else{
        Patient.updateOne({patientId: req.body.patientId},{
          patientId: req.body.patientId,
          name: req.body.name,
          firstName: req.body.firstName,
          birthDate: req.body.birthDate,
          pieceNumber: req.body.pieceNumber,
          gender: req.body.gender,
          address: req.body.address,
          typeOfPiece: req.body.typeOfPiece,
          placeOfResidence: req.body.placeOfResidence,
          phoneNumber: req.body.phoneNumber,
          employer: req.body.employer,
          electricityRelease: req.body.electricityRelease,
          waterClearance: req.body.waterClearance,
          nationality: req.body.nationality,
          fatherFullName: req.body.fatherFullName,
          motherFullName: req.body.motherFullName,
          // conventionId: req.body.convention, // Seulement l'Administrateur aura le droit de modifier la convention d'un patient
          $push:{
            "registrationInfos":{$each: [{userIds: req.body.user, registrationDate: req.body.registrationDate, centerIds: req.body.center}]}
          }
        }).then(()=>{
          res.status(201).json({message: 'Patient successfully updated !', patient: patient});
        }).catch((error)=>{
          res.status(400).json({error: error,
          message: 'Echec de mise à jour de Patient'});
        })
      }
    }).catch((error)=>{
      res.status(400).json({error: error, message: 'Erreur lors de la recherche du patient !'});
    })
};

//Lecture de tous les patients


// ************************* hateoasLinker = require('express-hateoas-links');

export const getAllPatient = async (req, res) => {
  try{
    return res.status(200).json({patients: await Patient.find()});
  }
  catch(e){
    return res.status(e.status).json({error: true, message: 'Error with Patient !'});
  }
};

export const findAPatient = (req, res, next) => {
  Patient.findOne({
    patientId: req.params.id
    // _id: req.params.id
  }).then(
    (patient) => {
      res.status(200).json({patients: patient});
      /*console.log(patient);*/
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
export const getOnePatient = (req, res, next) => {
  Patient.findOne({
    _id: req.params.id
  }).then(
    (patient) => {
      res.status(200).json(patient);
      /*console.log(patient);*/
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

//Modification d'un patient 
//Attention: Renseigner tous les champs avant de lancer la requête


export const modifyPatient = (req, res, next) => {
  const patient = new Patient({
    _id: req.params.id,
    name: req.body.name,
    firstName: req.body.firstName,
    birthDate: req.body.birthDate,
    pieceNumber: req.body.pieceNumber,
    typeOfPiece: req.body.typeOfPiece,
    gender: req.body.gender,
    address: req.body.address,
    placeOfResidence: req.body.placeOfResidence,
    phoneNumber: req.body.phoneNumber,
    employer: req.body.employer,
    electricityRelease: req.body.electricityRelease,
    waterClearance: req.body.waterClearance,
    nationality: req.body.nationality,
    fatherFullName: req.body.fatherFullName,
    motherFullName: req.body.motherFullName
  });
  Patient.updateOne({_id: req.params.id}, patient).then(
    () => {
      res.status(201).json({
        message: 'Patient updated successfully!',
        patient: patient
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

//Suppression d'un patient


export const deletePatient = (req, res, next) => {
  Patient.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Patient deleted successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
