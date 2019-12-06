// 项目状态数据字典
function projectStatus(num) {
    switch (Number(num)) {
        case 1:
            return '筹备'
        case 3:
            return '在建'
        case 4:
            return '完工'
        case 5:
            return '停工'
    }
}
// 供应商数据字典
function supplierName(num) {
    switch (Number(num)) {
        case 11:
            return '混凝土供应商'
        case 12:
            return '木材供应商'
        case 13:
            return '钢筋供应商'
        case 14:
            return '管线供应商'
        case 15:
            return '玻璃幕墙供应商'
        case 16:
            return '家居供应商'
        case 17:
            return '其它供应商'
    }
}
// 大型设备数据字典
function equipments(num) {
    switch (Number(num)) {
        case 0:
            return '起重机'
        case 1:
            return '升降机'
    }
}
//特种人员类别数据字典
function specialPersonType(num) {
    switch (Number(num)) {
        case 79:
            return '建筑电工'
        case 80:
            return '高处作业吊篮安装拆卸工'
        case 81:
            return '塔式起重机司机'
        case 82:
            return '施工升降机司机'
        case 83:
            return '电焊工'
        case 84:
            return '其他'
        case 85:
            return '建筑架工'
        case 86:
            return '普通脚手架工'
        case 87:
            return '附着升降脚手架工'
        case 88:
            return '建筑起重信号、司索工'
        case 89:
            return '建筑起重机司机'
        case 90:
            return '物料提升机司机'
        case 91:
            return '门式起重机司机'
        case 92:
            return '桥式起重机司机'
        case 93:
            return '汽车式起重机司机'
        case 94:
            return '建筑起重机械安装拆卸工'
        case 95:
            return '塔机安（拆）工'
        case 96:
            return '施工升降机安（拆）工'
        case 97:
            return '物料提升机安（拆）工'
        case 98:
            return '门式起重机安（拆）工'
        case 99:
            return '桥式起重机安（拆）工'
    }
}
export {
    projectStatus,
    supplierName,
    equipments,
    specialPersonType
}