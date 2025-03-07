import Center from './model';

export const createCenter = (req, res, next) => {
    Center.findOne({
        wording: req.body.wording
      }).then(
        (center) => {
            if (!center){
                const newCenter = new Center({
                    wording: req.body.wording,
                    registrationInfos:{
                    patientIds: req.body.patientId,
                    registrationDate: req.body.registrationDate
                  },
                    prestationIds: req.body.prestationId
                });
                newCenter.save().then(
                    () => { res.status(201).json({message: 'New Center created successfully !', center: newCenter});
                }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );
            }
            else{
                Center.updateOne({wording: req.body.wording},{
                    $push:{
                        "registrationInfos": {$each: [{ patientIds: req.body.patientId, registrationDate: req.body.registrationDate}]},
                        "prestationIds" : {$each: [req.body.prestationId]}
                        }}).then(
                                () => {
                                    res.status(201).json({
                                        message: 'The center has been updated succsessfully !'
                                        });
                                }
                            ).catch(
                            (error) => {
                                res.status(400).json({ error: error});
                            }
                            );
            }
            
          //res.status(200).json(center);
          /*console.log(patient);*/
        }
      ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      );
    
    // const center = new Center({
    //     wording: req.body.wording
    //     // ,[patientIds]: req.body.patientId,
    //     // prestationIds: req.body.prestationId
    // });
//     center.save()
};

export const getAllCenter = async (req, res, next) => {
  try{
    return res.status(200).json({centers: await Center.find()});
  }
  catch(e){
    return res.status(e.status).json({error: true, message: 'Error with Center !'});
  }

};

export const findCenterByWording = (req, res, next) => {
  Center.findOne({wording: req.params.wording
  }).then((center) => {
    res.status(200).json({centers: center});
  }
  ).catch((error) => {
    res.status(404).json({
      error: error
    });
  }
  );
};