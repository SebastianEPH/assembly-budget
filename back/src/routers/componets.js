const express = require('express');
const processor =  require("../controller/componets/ctrl_processor")
const motherboard =  require("../controller/componets/ctrl_motherboard")
const memoryram =  require("../controller/componets/ctrl_memoryram")



const router = express.Router();

// processor
router.get("/proforma/:proforma_id/processor", processor.get)
router.post("/proforma/:proforma_id/processor", processor.add)
router.put("/proforma/:proforma_id/processor/:processor_id", processor.update)
//router.get("/:id_proforma/processor/:id_processor", processor.get_only)
//router.get("/:id_proforma/processor", processor.get)

// Motherboard
router.get("/proforma/:proforma_id/motherboard", motherboard.get)
router.put("/proforma/:proforma_id/motherboard/:motherboard_id", motherboard.update)
//router.get("/:proforma_id/motherboard/:motherboard_id", processor.getOnly)
// MemoryRAM

// Memory RAM
router.get("/proforma/:proforma_id/memoryram", memoryram.get)
router.post("/proforma/:proforma_id/memoryram", memoryram.add)
router.delete("/proforma/:proforma_id/memoryram/:memoryram_id", memoryram.delete)
router.put("/proforma/:proforma_id/memoryram/:memoryram_id", memoryram.update)

// Memory RAM Type
router.get("/memoryram_type", memoryram.getType)

// Memory RAM Size
router.get("/memoryram_size", memoryram.getSize)

// Memory RAM Frequency
router.get("/memoryram_frequency", memoryram.getFrequency)


module.exports = router;