const { Venues } = require('../models')

class VenuesController {
  static async findAll(req, res) {
    let venues = await Venues.findAll()
    res.status(200).json({status:'success', data:venues})
  }

  static async store(req, res) {
    let name = req.body.name
    let address =  req.body.address
    let phone = req.body.phone

    // cara 1 gunakan instance
    // let newVenues = Venues.build({ name:name, address:address, phone:phone })
    // console.log(newVenues instanceof Venues)
    // await newVenues.save()

    // cara 2 gunakan metode create
    const venues = await Venues.create({ name:name, address:address, phone:phone })  
    res.status(201).json({status:'success', message:'data Venue di simpan', data:venues})
  }

  static async show(req, res) {
    let id = req.params.id
    
    // cara 1 belum berupa object
    // let venues = await Venues.findAll({
    //   where: {
    //     id:id 
    //   },
    //   limit: 1 
    // })

    // cara 2 sudah berbentuk object
    let venues = await Venues.findByPk(id)
    res.status(200).json({status:'success', data:venues})
  }

  static async update(req, res) {
    let id = req.params.id
    let name = req.body.name
    let address =  req.body.address
    let phone = req.body.phone
    
    // cara 1 menggunakan update
    let venues = await Venues.update( {name, address, phone}, {
      where: {
        id: id
      }
    })

    // cara 2 menggunakan upsert
    // await Venues.upsert({
    //   id: id,
    //   name,
    //   address,
    //   phone,
    // });

    // console.log(name,address,phone)
    res.status(201).json({status:'success', message:'perubahan Venue di simpan'})
  }

  // hanya hapus berdasarkan id nya
  static async delete(req, res) {
    let id = req.params.id

    await Venues.destroy({
      where: {
        id: id
      }
    });
    res.status(200).json({status:'success', message:`venue ${id} berhasil di hapus`})
  }

  // Drop semua isi tabel
  static async dropData(req, res) {
    await Venues.destroy({
      truncate: true
    });
    res.status(200).json({status:'success', message:'data tabel berhasil di hapus'})
  }
} 

module.exports = VenuesController