class TopologyController {
    redFontColor = '\x1b[31m%s\x1b[0m';

    deleteTopology(topologyId, memoryTopologyList) {
        const findMemTop = memoryTopologyList.find(topo => topo.id == topologyId);
        if (findMemTop) {
            const newMemTopList = memoryTopologyList.filter(top => top.id != topologyId);
            return newMemTopList
        } else {
            console.log(this.redFontColor, "\nError!! No topology with such id in memory to be deleted.");
        }

    }

    queryDevices(topologyId, memoryTopologyList) {
        const findMemTop = memoryTopologyList.find(topo => topo.id == topologyId);
        if (findMemTop) {
            return findMemTop.components;
        } else {
            console.log(this.redFontColor, "\nError!! No topology with such id in memory.");
        }

    }

    queryDevicesWithNetListNode(topologyId, memoryTopologyList, netListNodeId) {
        const findMemTop = memoryTopologyList.find(topo => topo.id == topologyId);
        if (findMemTop) {
            const findNetList = findMemTop.components.find(node => node.id == netListNodeId);
            if (findNetList) {
                return findNetList.netlist;
            }
            else {
                console.log(this.redFontColor, "\nError!! No net list node with such id in this topology's devices.");
            }
        } else {
            console.log(this.redFontColor, "\nError!! No topology with such id in memory.");
        }

    }
}

module.exports = TopologyController;