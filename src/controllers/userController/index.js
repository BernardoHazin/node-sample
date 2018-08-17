const {User} = require('../../models')

module.exports = {
  /** 
   * @param {string} username - Nome de usuário.
   * @param {string} password - Senha do usuário.
  */  
  async register (req, res) {
    try {
      await User.create(req.body)
      res.send({message: 'User added!'})
    } catch (error) {
      console.log(error.message)
      res.status(500).send({message: 'Error interno'})
    }
  },
  /** 
   * @param {string} username - Nome de usuário.
   * @param {string} password - Senha do usuário.
  */  
  async login (req, res) {
    try {
      const {username, password} = req.body
      const user = await User.findOne({ where: {username: username} })
      if (!user) {
        return res.status(400).send({
          message: 'Usuário não encontrado'
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        res.status(403).send({message: 'Senha não confere'})
        return
      }
      res.send({ user }) 
    } catch (error) {
      console.log(error.message)
      res.status(500).send({message: 'Sistema indisponível'})
    }
  }
}
