const TopologyController =  require("./classes/TopologyController")
const JSONHandler =  require("./classes/JSONHandler")
const ps = require("prompt-sync");
const prompt = ps();
const fontColor = {
    red: '\x1b[31m%s\x1b[0m',
    green: '\x1b[32m%s\x1b[0m',
    blue: '\x1b[36m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m'
}

let memoryTopologyList = [
    {
        "id": "top1",
        "components": [
            {
                "type": "resistor",
                "id": "res1",
                "resistance": {
                    "default": 100,
                    "min": 10,
                    "max": 1000
                },
                "netlist": {
                    "t1": "vdd",
                    "t2": "n1"
                }
            }
        ]
    },
    {
        "id": "top2",
        "components": []
    },
    {
        "id": "top3",
        "components": [
            {
                "type": "resistor",
                "id": "res1",
                "resistance": {
                    "default": 100,
                    "min": 10,
                    "max": 1000
                },
                "netlist": {
                    "t1": "vdd",
                    "t2": "n1"
                }
            },
            {
                "type": "resistor",
                "id": "res2",
                "resistance": {
                    "default": 100,
                    "min": 10,
                    "max": 1000
                },
                "netlist": {
                    "t1": "vdd",
                    "t2": "n1"
                }
            },
            {
                "type": "capacitor",
                "id": "cap1",
                "capacitance": {
                    "default": 100,
                    "min": 10,
                    "max": 1000
                },
                "netlist": {
                    "t1": "vdd",
                    "t2": "n1"
                }
            },
            {
                "type": "nmos",
                "id": "m1",
                "m(l)": {
                    "default": 1.5,
                    "min": 1,
                    "max": 2
                },
                "netlist": {
                    "drain": "n1",
                    "gate": "vin",
                    "source": "vss"
                }
            }
        ]
    },
    {
        "id": "top4",
        "components": [
            {
                "type": "resistor",
                "id": "res1",
                "resistance": {
                    "default": 100,
                    "min": 10,
                    "max": 1000
                },
                "netlist": {
                    "t1": "vdd",
                    "t2": "n1"
                }
            },
            {
                "type": "nmos",
                "id": "m1",
                "m(l)": {
                    "default": 1.5,
                    "min": 1,
                    "max": 2
                },
                "netlist": {
                    "drain": "n1",
                    "gate": "vin",
                    "source": "vss"
                }
            }
        ]
    },
    {
        "id": "top5",
        "components": [
            {
                "type": "resistor",
                "id": "res1",
                "resistance": {
                    "default": 100,
                    "min": 10,
                    "max": 1000
                },
                "netlist": {
                    "t1": "vdd",
                    "t2": "n1"
                }
            },
            {
                "type": "nmos",
                "id": "m1",
                "m(l)": {
                    "default": 1.5,
                    "min": 1,
                    "max": 2
                },
                "netlist": {
                    "drain": "n1",
                    "gate": "vin",
                    "source": "vss"
                }
            }
        ]
    }
];
let fileTopologyList = [];
let jsonHandler = new JSONHandler();
let topologyController = new TopologyController();
let operation, fileName, topologyId, netListId, devices, tempList;

const pauseScript = function () {
    console.log('\x1b[36m');
    require('child_process').spawnSync("pause", { shell: true, stdio: [0, 1, 2] });
    console.log('\x1b[0m');
}




while (1) {
    console.log(fontColor.blue, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log('\x1b[4m%s\x1b[0m', "Operations:");
    console.log("1) Read JSON\n2) Write JSON\n3) Query topologies in memory\n4) Delete topology from memory\n5) Query devices\n6) Query devices with net list nodes\n7) Exit\n");
    operation = prompt("Enter operation number: ");
    if (operation == 1) {
        console.log(fontColor.green, "\nOperation: Read JSON");
        fileName = prompt("Enter filename: ");
        fileTopologyList = jsonHandler.readJSON(fileName);
        if (fileTopologyList) {
            jsonHandler.printJSON(fileTopologyList);
        }
    }
    else if (operation == 2) {
        console.log(fontColor.green, "\nOperation: Write JSON");
        topologyId = prompt("Enter topology id: ");
        fileName = prompt("Enter filename: ");
        fileTopologyList = jsonHandler.writeJSON(topologyId, memoryTopologyList, fileName);
        if (fileTopologyList) {
            jsonHandler.printJSON(fileTopologyList);
        }
    }
    else if (operation == 3) {
        console.log(fontColor.green, "\nOperation: Query topologies in memory");
        if (memoryTopologyList.length != 0) {
            jsonHandler.printJSON(memoryTopologyList);
        }
        else {
            console.log(fontColor.yellow, "\nNo topologyList in memory.");
        }
    }
    else if (operation == 4) {
        console.log(fontColor.green, "\nOperation: Delete topology from memory");
        topologyId = prompt("Enter topology id: ");
        tempList = topologyController.deleteTopology(topologyId, memoryTopologyList);
        if (tempList) {
            memoryTopologyList = tempList;
            jsonHandler.printJSON(memoryTopologyList);
        }
    }
    else if (operation == 5) {
        console.log(fontColor.green, "\nOperation: Query devices");
        topologyId = prompt("Enter topology id: ");
        devices = topologyController.queryDevices(topologyId, memoryTopologyList);
        if (devices) {
            jsonHandler.printJSON(devices);
        }
    }
    else if (operation == 6) {
        console.log(fontColor.green, "\nOperation: Query devices with net list nodes");
        topologyId = prompt("Enter topology id: ");
        netListId = prompt("Enter net list node id: ");
        devices = topologyController.queryDevicesWithNetListNode(topologyId, memoryTopologyList, netListId);
        if (devices) {
            jsonHandler.printJSON(devices);
        }
    }
    else if (operation == 7) {
        break;
    }
    else {
        console.log(fontColor.red, "\nError!! Invalid operation number.");
    }
    
    pauseScript();

}