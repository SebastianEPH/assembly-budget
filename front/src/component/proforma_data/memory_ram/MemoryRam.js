import InputSelect from "../../util/InputSelect";
import {useForm} from "../../hooks/useForm";
import {Row, Col, Modal, Button} from "react-bootstrap";
import ModalConfirmation from "../../util/ModalConfirmation";
import connection from "../../../config/connection";
import toast from "react-hot-toast";
import {useEffect} from "react";

// MODAL: if true, then use added, otherwise use update function
const MemoryRam = ({ data, dataType, modal=false, dataSize , dataBrand, dataStore, dataFreq,loadMemoryRAM,modalHandleClose}) =>{

    const {form, update, updateHook, clean} = useForm(data)
    let  {name,proforma_id, id, type, size, freq, brand, dol, link ,select, sol} = form

    // useEffect(()=>{
    //     console.log("Memoria RAM montada id: ",id, " name",name)
    //
    //     return()=>{
    //
    //         console.log("Memoria RAM desmontada id: ",id," name",name)
    //     }
    // },[])

    const addMemoryRAM = async() =>{
        await  connection.addMemoryRam(proforma_id, form)
            .then((m)=>{
                toast.success(m.data.message)
                clean(false) // clean  inputs
            })
            .catch((m)=>{
                toast.error(m.response.data.message)
            })

        modalHandleClose()
        await loadMemoryRAM() // update memoryRAM
    }
    const updateMemoryRAM = async() =>{
        await  connection.updateMemoryRam(proforma_id, id, form)
            .then((m)=>{
                toast.success(m.data.message)
            })
            .catch((m)=>{
                toast.error(m.response.data.message)
            })
    }
    const remove= async() =>{
        console.log('Se eliminó el que tiene ID de ', id)
        await  connection.delMemoryRam(proforma_id, id)
            .then((m)=>{
                toast.success(m.data.message)
                var div = document.getElementById('memoryRAM_'+id);
                if(div !== null){
                    while (div.hasChildNodes()){
                        div.removeChild(div.lastChild);
                    }
                }else{
                    console.log('No existe el modulo a eliminar ')
                }
            })
            .catch((m)=>{
                toast.error(m.response.data.message)
            })
        // loadMemoryRAM() // update memoryRAM
    }

    return(
        <div id={'memoryRAM_'+id} className={" p-1 m-1"}>
            <Row>
                {/*border border-info*/}
                <Col md={11}>
                    {/*<Row>*/}

                    {/*    <span>{`${name} ${dataType[0].name} ${dataFreq[0].name} ${dataSize[0].name} ${dataBrand[0].name}`}</span>*/}

                    {/*</Row>*/}
                    <Row>
                        <Col md="10">
                            <div className="form-floating mb-1">
                                <input name="name"
                                       type="text"
                                       className="form-control col-auto"
                                       id="floatingInput"
                                       placeholder="name ejample: Patriot signature line"
                                    // defaultValue={''}
                                       value={name}
                                       onChange={(e)=>update(e)}
                                />
                                <label htmlFor="floatingInput">Name</label>
                            </div>

                        </Col>
                        <InputSelect name={"size"} title={"Size"} update={update} select={size} col={2} data={dataSize}/>
                    </Row>
                    <Row>
                        <InputSelect name={"type"} title={"type RAM"} update={update} select={type} col={2} data={dataType}/>
                        <InputSelect name={"freq"} idCondition={type} title={"Frequency"} update={update} select={freq} col={3} data={dataFreq}/>
                        <InputSelect name={"brand"} title={"Brand"} update={update} select={brand} col={3} data={dataBrand}/>
                        <Col md="2">
                            <div className="form-floating">
                                <input name="sol" type="text" className="form-control" id="floatingInputValue"
                                       placeholder="S/ 0" value={sol|| ""} onChange={(e)=>updateHook(e,"dol")}/>
                                <label htmlFor="floatingInputValue">Soles</label>
                            </div>
                        </Col>
                        <Col md="2">
                            <div className="form-floating">
                                <input name="dol" type="text" className="form-control " id="floatingInputValue"
                                       placeholder="$ 0" value={dol|| ""} onChange={(e)=>updateHook(e, "sol")}/>
                                <label htmlFor="floatingInputValue">Dollar</label>
                            </div>

                        </Col>
                    </Row>
                    <Row>
                        <Col md={'10'}>
                            <div className="form-floating mb-1">
                                <input name="link"
                                       type="text"
                                       className="form-control col-auto"
                                       id="floatingInput"
                                       placeholder="link"
                                    // defaultValue={''}
                                       value={link}
                                       onChange={(e)=>update(e)}
                                />
                                <label htmlFor="floatingInput">link</label>
                            </div>

                        </Col>
                        <InputSelect name={"store"} idCondition={type} title={"Store"} update={update}  col={2} data={dataStore}/>
                    </Row>
                </Col>
                <Col md={1}>
                    <Row>
                        <button className="btn btn-outline-success" onClick={modal?addMemoryRAM:updateMemoryRAM} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 className="bi bi-check-circle" viewBox="0 0 20 20" >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path
                                    d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                            </svg>save</button>
                    </Row>
                    <Row>
                        <button className="btn btn-outline-info" onClick={clean}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 className="bi bi-eraser"  viewBox="0 0 20 20">
                                <path
                                    d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
                            </svg>
                        </button>
                    </Row>
                    <Row>
                        <ModalConfirmation title={"confirmacion"} text={"deseas elimnar de verdad ?"} ok={remove}/>

                    </Row>
                    <Row className="form-check form-switch ">
                        <input className="form-check-input"
                               name="select"
                               type="checkbox"
                               role="switch"
                            // checked={select}
                               value={select}
                               defaultChecked={select}
                               onChange={(e)=>{
                                   e.target.value = e.target.checked? '1':'0'
                                   update(e)
                               }}/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 className="bi bi-bookmark-plus" viewBox="0 0 20 20">
                                <path
                                    d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </label>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default MemoryRam;