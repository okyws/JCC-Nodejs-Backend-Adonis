export default class Karyawan{
	constructor(name,password,role)
	{
		this.name=name
		this.password=password
		this.role=role
		this.isLogin=false
	}
	changeLogin(){
		this.isLogin=!this.isLogin
	}
}