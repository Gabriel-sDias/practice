function status(request, response){
  response.status(200).json({status:"Tudo ok"});
}

export default status;