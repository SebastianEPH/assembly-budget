import axios from "./axios";
const connectionAPI =  axios.create({
    baseURL: "http://127.0.0.1:5000/api/"

})
const pool = {}


pool.getProforma = async (id)=>  {
    console.log('consultado API [proforma]')
    const query = await connectionAPI.get(`/proforma/${id}`)
    const json = query.data
    return json[0]

}
pool.getBrand = async ()=>{
    const brand= await connectionAPI.get(`/brand`)
    return brand.data
}
pool.getStore = async ()=>{
    const brand= await connectionAPI.get(`/store`)
    return brand.data
}
pool.updateMemoryRam = async (proforma_id, memory_id, data)=>{
    return await connectionAPI.put(`/proforma/${proforma_id}/memoryram/${memory_id}`,data) //body:JSON.stringify(motherboard)
}
pool.addMemoryRam = async (proforma_id, data)=>{
    console.log('esto es del front', data)
    return await connectionAPI.post(`/proforma/${proforma_id}/memoryram`,data)
}
pool.delMemoryRam = async (proforma_id, memory_id)=>{
    console.log('Delete memory id = ', memory_id)
    return await connectionAPI.delete(`/proforma/${proforma_id}/memoryram/${memory_id}`)
}
pool.getMemoryRam = async (proforma_id)=>{
    return await connectionAPI.get(`/proforma/${proforma_id}/memoryram`)
}
pool.getMemoryRamType = async ()=>{
    return await connectionAPI.get(`/memoryram_type`)
}
pool.getMemoryRamSize = async ()=>{
    return await connectionAPI.get(`/memoryram_size`)
}
pool.getMemoryRamFrequency = async ()=>{
    return await connectionAPI.get(`/memoryram_frequency`)
}

pool.hola = async (id)=>{
    console.log('consultado API [proforma]')
    const queryProjects = await connectionAPI.get(`/proforma/${id}`)


    //console.log(queryProjects )
    const json = queryProjects.data


    console.table("respuesta query",queryProjects)

    // setProcessor(json[0].processor)
    // setMotherboard(json[0].motherboard)
    //
    // setMemoryRAM(json[0].memory_ram)
    // setMemoryRAMType(json[0].memory_ram_type)
    // setMemoryRAMFrequency(json[0].memory_ram_frequency)
    // setMemoryRAMSize(json[0].memory_ram_size)
    console.log(json[0])
    // console.log()
    // console.log(json[0])
    // console.log('proforma ')


    return json[0]
}

export default pool;
// const  consultarApi = async (id)=>    {
//     // console.log('consultado API ')
//     const queryProjects = await connectionAPI.get(`/proforma/${id}`)
//
//     const brand= await connectionAPI.get(`/brand`)
//     const brandProcessor= await connectionAPI.get(`/brand_processor`)
//
//     //console.log(queryProjects )
//     const json = queryProjects.data
//     // console.log(json)
//     //console.log('esto es el proforma normal')
//     //console.log(json)
//     //console.log('esto es el processreor')
//     //console.log(json[0].processor)
//     ///setproforma(json)
//
//     setBrand(brand.data)
//     setBrandProcessor(brandProcessor.data)
//
//     setProcessor(json[0].processor)
//     setMotherboard(json[0].motherboard)
//
//     setMemoryRAM(json[0].memory_ram)
//     setMemoryRAMType(json[0].memory_ram_type)
//     setMemoryRAMFrequency(json[0].memory_ram_frequency)
//     setMemoryRAMSize(json[0].memory_ram_size)
// }

//const  consultarApi = async (proforma_id, processor_id)=>    {
//    console.log('consultado API denbtro ')

//    const processor= await connectionAPI.get(`/proforma/${id}/processor`)
//    const motherboard = await connectionAPI.get(`/proforma/${id}/motherboard`)

//    console.table(processor.data)
//    console.table(motherboard.data)
//    setMotherboard(motherboard.data)
//    setProcessor(processor.data)

//    //console.log(queryProjects )

//   //const json = queryProjects.data
//   //console.log('esto es el proforma normal')
//   //console.log(json)
//   //console.log('esto es el processreor')
//   //console.log(json[0].processor)
//   //setproforma(json)
//   //setprocessor(json[0].processor)
//}





