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
export{
    projectStatus,
}