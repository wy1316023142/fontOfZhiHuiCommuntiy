import { getUrlParame } from '@/common/util.js'
export const getParentParame = {
    data() {

    },
    mounted(){
        //window.addEventListener('message', this.handleMessage)
        if(getUrlParame('organId')){
            this._fetchData(getUrlParame('organId'))
        }
    },
    methods:{

        handleMessage : function (event) {
            if(event.data.organId){
                this._fetchData(event.data.organId)
            }
        }
    }
}

