export const validateSchema = (schemaRequest) => (req, res, next) => {
  try {
    schemaRequest.parse(req.body);
    next();
  } catch (error) {
    console.log(error.errors);
    return res
      .status(400)
      .json({ error: error.errors.map((error) => error.message) });
  }
};

export const validateParams = (req, res, next) => {
if(Object.keys(req.params).length === 0){
    console.log("Recurso no encontrado. URL sin parámetros o desconocida");
    return res.sendStatus(404) 
}
  next();
};
