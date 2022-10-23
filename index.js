const express=require("express")
const router=express.Router()
const bodyParser=require("body-parser")
const urlcodeParser=bodyParser.urlencoded({extended:false})
var app=express()

router.get("/",function(req,res){
	res.send("Mensaje: Soy el API - Arriba")
})
//Insertar Registros a tab_Proveedores (PRV=PROVEEDOR)
router.post("/Add_Proveedor",urlcodeParser,function(req,res){
	const CDG_PRV=req.body.CDG_PRV
	const NOM_PRV=req.body.NOM_PRV
	const NIT=req.body.NIT
	const DIR_PRV=req.body.DIR_PRV
	const CIU_PRV=req.body.CIU_PRV
	const TEL_PRV=req.body.TEL_PRV
	const E_MAIL=req.body.E_MAIL
	const SLD_PGR=req.body.SLD_PGR
	const TOT_CMP=req.body.TOT_CMP
	const AUT_RET=req.body.AUT_RET

	req.getConnection((err,conn)=>{
		if(err) return res.send(err)
		const x=""
		const consulta=x.concat('insert into tab_proveedores (CDG_PRV,NOM_PRV,NIT,DIR_PRV,CIU_PRV,TEL_PRV,E_MAIL,SLD_PGR,TOT_CMP,AUT_RET) value("',CDG_PRV,'","',NOM_PRV,'","',NIT,'","',DIR_PRV,'","',CIU_PRV,'","',TEL_PRV,'","',E_MAIL,'","',SLD_PGR,'","',TOT_CMP,'","',AUT_RET,'")')
		conn.query(consulta,[req.body],(err,result,rows)=>{
			if(err){
				res.send(err)
			}
			else
			{
				res.status(200).send({Adicionado :1})
				if(res.status(200)){
					console.log("Proveedor Almacenado")
					console.log(result)
				}
			}
		})
	})
})
// Mostrar Registros tabla de Proveedores
router.post("/Ver_Archivo",urlcodeParser,function(req,res){
	req.getConnection((err,conn)=>{
		if(err) return res.send(err)
		const consulta="select * from tab_proveedores"
		conn.query(consulta,[req.body],(err,result,rows)=>{
			if(err){res.send(err)}
			else{
				res.status(200).send({result})
				console.log(result)
			}
		})
	})
})
//login 
router.post("/login",urlcodeParser,function(req,res){
	const UserName=req.body.UserName
	const Password=req.body.Password
	req.getConnection((err,conn)=>{
		if(err) return res.send(err)
		const x=""
		const consulta=x.concat('select * from usuarios where CDG_PRV="',CDG_PRV,'" and Password="',Password,'"')
		conn.query(consulta,[req.body],(err,result,rows)=>{
			if(err){
				res.send(err)
			}
			else{
				if(result.length>0){
					res.status(200).send({existe:1, userid:result[0].Id})
					console.log(result[0].Id)
					console.log(result)
				}
				else{
					res.status(200).send({existe:0})
				}
			}
		})
	})
})
// Mostrar Registro con parametros
router.post("/BuscaNombre",urlcodeParser,function(req,res){
	const NOM_PRV=req.body.NOM_PRV
	req.getConnection((err,conn)=>{
		if(err) return res.send(error)
		const x=""
		const consulta=x.concat('select * from tab_proveedores where NOM_PRV="',NOM_PRV,'"')
		console.log(consulta)
		conn.query(consulta,[req.body],(err,result,rows)=>{
			if(err){res.send(err)}
			else{
				res.status(200).send({result})
				console.log(result)
			}
		})
	})
})
// Actualizar Registro
router.post("/Update",urlcodeParser, function(req,res) {
	const CDG_PRV=req.body.CDG_PRV
	const NOM_PRV=req.body.NOM_PRV
	const NIT=req.body.NIT
	const DIR_PRV=req.body.DIR_PRV
	const CIU_PRV=req.body.CIU_PRV
	const TEL_PRV=req.body.TEL_PRV
	req.getConnection((err, conn)=>{
		const x="";
		const consulta=x.concat('update tab_proveedores set DIR_PRV="',DIR_PRV,'", CIU_PRV="',CIU_PRV,'", TEL_PRV="',TEL_PRV,'" where CDG_PRV="',CDG_PRV,'"')
		console.log(consulta)
		conn.query(consulta,[req.body],(err, result, fields) => {
			if(err){
				res.send(err)
			}
			else{
				res.status(200).send({Actualizado:1});
				if(res.status(200)){
					console.log("Registro Actualizado")
					console.log(result)
				}
			}
		})
	})
});
// Eliminar Registro
router.post("/Delete",urlcodeParser, function(req,res) {
const CDG_PRV=req.body.CDG_PRV
req.getConnection((err, conn)=>{
	if(err) return res.send(err)
	const x=""
	const consulta=x.concat('delete from tab_proveedores where CDG_PRV="',CDG_PRV,'"')
	conn.query(consulta,[req.body],(err, result, fields) => {
		if(err) return res.send(err)
			res.status(200).send("Registro Eliminado")
		})
	})
})



module.exports=router
