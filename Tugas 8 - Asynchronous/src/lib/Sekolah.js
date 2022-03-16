import fspromises from 'fs/promises'
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Karyawan from './Karyawan';

import Siswa from './Siswa';
export default class Sekolah{
	constructor(employees){
		this.employees=employees
		this.path='./data.json'
		this.siswa=[]
	}
	async register(newKaryawan){
		try{
			this.employees.push(newKaryawan)
			await fspromises.writeFile(this.path,JSON.stringify(this.employees))
			console.log("Berhasil Register")
			console.log(newKaryawan)
		}catch(error){
			console.log("Gagal Register")
		}
	}
	async login(name,password){
		try{
			let findEmployee=this.employees.find(employee=>employee.name===name)
			if(findEmployee.password==password)
			{
				let employeeLogin=new Karyawan(findEmployee.name,findEmployee.password,findEmployee.role,findEmployee.isLogin)
				employeeLogin.isLogin=true
				let findIndex=this.employees.findIndex(emp=>emp.name===employeeLogin.name)
				this.employees.splice(findIndex,1,employeeLogin)
				await fspromises.writeFile(this.path,JSON.stringify(this.employees))
				console.log(`Berhasil Login sebagai ${findEmployee.role}\n`, employeeLogin)
			}else{
				throw new Error("Gagal Login")
			}
		}catch(error){
			console.log("Gagal Login")
		}
	}
	async addSiswa(name,trainer_name){
		try{
			let findEmployee=this.employees.find(employee=>employee.name===trainer_name)
			if(findEmployee.isLogin == true || findEmployee.role.toLowerCase() == "trainer"){
				let employeeLogin=new Karyawan(findEmployee.name,findEmployee.password,findEmployee.role,findEmployee.isLogin)
				let siswaBaru=new Siswa(name)
				this.siswa.push(siswaBaru)
				employeeLogin.siswa=this.siswa
				let findIndex=this.employees.findIndex(emp=>emp.name===employeeLogin.name)
				
				this.employees.splice(findIndex,1,employeeLogin)
				await fspromises.writeFile(this.path,JSON.stringify(this.employees))
				console.log(`Berhasil add Siswa`)
			}else{
				throw new Error("Gagal add Siswa")
			}
		}catch(error){
			console.log("Gagal add Siswa")
		}
		
	}
}