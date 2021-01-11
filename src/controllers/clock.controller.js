const db = require('../config/database');

function getAngle(hours, minutes){
    if(hours === 12){
        hours = 0;
    }

    let hoursAngle =  hours * 30 + (minutes/60)*30;
    let minutesAngle =  minutes * 6;

    let angle;

    if(hoursAngle > minutesAngle){
        angle = hoursAngle - minutesAngle;
    }else{
        angle = minutesAngle - hoursAngle;
    }

    return angle;
}

// ==> Método responsável por criar um novo 'save':
exports.createClock = async (req, res) => {

  const horas = parseInt(req.params.horas);
  const minutos = parseInt(req.params.minutos);
  

  const resp =  await db.query(
      'SELECT * FROM clock_save where horas= $1 AND minutos=$2', [horas, minutos]
  );

  if(resp.rowCount === 1){
 
    res.status(200).send(
      {
        message: 'Clock found successfully!',
        body:{
          ...resp.rows[0]
        }
      }
    );

  }else{
<<<<<<< HEAD
    const angulo = parseInt(getAngle(horas, minutos));
    const dt =  new Date();
=======
    const angless = parseInt(getAngle(horass, minutuu));
    const datee =  new Date();
>>>>>>> 158f9899d3fd16db4cb404c9978904bae47843b5

    const response = await db.query(
        'INSERT INTO clock_save (horas, minutos, angulo, dt) VALUES ($1, $2, $3, $4)',
        [horas, minutos, angulo, dt],
    );

    res.status(201).send({
        message: 'Clock added successfully!',
        body: {
          clock: {horas, minutos, angulo, dt},
        }, 
      });
   }

};

  



  

