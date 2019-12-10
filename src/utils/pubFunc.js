
// 获取项目列表供下拉框选择
function pullProjectLists(that){
    return new Promise((reslove,reject)=>{
        that.$axios.post('/t_dz_project/selectProjectAllNames').then((res)=>{
            reslove(res.data)
        })
    })
}
export{
    pullProjectLists
}