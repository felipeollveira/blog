const pub = (req, res) => {
    const id = req.body.id; 
    console.log(id)
  res.redirect(`/post/${id}`);
  };



  
  module.exports = pub
  