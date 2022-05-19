class JSONHandler {
    constructor() {
        this.fs = require("fs");
        this.path = require("path");
    }

    fontColor = {
        red: '\x1b[31m%s\x1b[0m',
        green: '\x1b[32m%s\x1b[0m',
    }

    readJSON(fileName) {
        try {
            const filePath = this.path.join(__dirname, `../DB/${fileName}`);
            const allTopologies = JSON.parse(this.fs.readFileSync(filePath));
            return allTopologies;
        } catch (error) {
            console.log(this.fontColor.red, "\nError!! File with such name doesn't exist.");
        }
    }

    writeJSON(topologyId, memoryTopologyList, fileName) {
        const filePath = this.path.join(__dirname, `../DB/${fileName}`);
        let findMemTop = memoryTopologyList.find(topo => topo.id == topologyId);
        if (findMemTop) {
            try {
                let fileTopologyList = this.readJSON(fileName);
                let findFileTop = fileTopologyList.find(topo => topo.id == topologyId);
                if (!findFileTop) {
                    fileTopologyList.push(findMemTop);
                    this.fs.writeFileSync(filePath, JSON.stringify(fileTopologyList));
                    console.log(this.fontColor.green, "\nTopology added successfully to topology.json file.");
                } else {
                    console.log(this.fontColor.red, "\nTopology with such id already exists in the JSON file.");
                }
            } catch (error) {
            }

        }
        else {
            console.log(this.fontColor.red, "\nError!! No topology with such id in memory.");
        }
    }

    printJSON(jsonObj) {
        console.log(JSON.stringify(jsonObj, null, 2));
    }
}

module.exports = JSONHandler;