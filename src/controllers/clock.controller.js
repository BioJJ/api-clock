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

// ==> Método responsável por criar um novo 'Product':
exports.createClock = async (req, res) => {

  const horass = parseInt(req.params.horas);
  const minutuu = parseInt(req.params.minutos);
  

  const resp =  await db.query(
      'SELECT * FROM clock_save where horas= $1 AND minuto=$2', [horass, minutuu]
  );

  if(resp.rowCount === 1){
 
    res.status(201).send(resp.rows);

  }else{
    const angless = getAngle(horass, minutuu);
    const datee =  new Date();

    const response = await db.query(
        'INSERT INTO clock_save (horas, minuto, angle, dataa) VALUES ($1, $2, $3, $4)',
        [horass, minutuu, angless, datee],
    );

    res.status(201).send({
        message: 'Clock added successfully!',
        body: {
          clock: {horass, minutuu, angless, datee},
        }, 
      });
   }

};

  



  

