// 项目状态数据字典
function projectStatus(num){
    switch(Number(num)){
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
function supplierName(num){
    switch(Number(num)){
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
function equipments(num){
    switch(Number(num)){
        case 0:
            return '起重机'
        case 1:
            return '升降机'
    }
}
export{
    projectStatus,
    supplierName,
    equipments
}