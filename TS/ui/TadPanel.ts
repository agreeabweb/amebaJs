import {HashMap} from "../lib/HashMap";
/**
 * Created by Oliver on 2016-08-03 0003.
 */
export class TadPanel {

    private widgetRegistry : HashMap = new HashMap();
    private id:string = "";
    private parentId :string = "";
    private tadId:string ="";
    private entryToViews :HashMap = new HashMap();


    constructor(tadId: string, parentId: string, id:string) {

        this.tadId =tadId;
        this.parentId=parentId;
        this.id = id;
    }

    public registerEntryView(name:string,view:any){
        let views = this.entryToViews.get(name);
        if(views == null){
            views = new Array();
        }
        views.push(view);
    }
    public registerWidget(id:string,view : any):void {
        this.widgetRegistry.put(id,view);
    }

    public getWidget(id:string){
        return this.widgetRegistry.get(id);
    }

    public start():void{
        
    }

    public getViewsByEntry(name:string):IView[]{
        return this.entryToViews.get(name);
    }

    public queueTaskPack(mission:IMission ){

        mission.execute(function () {

        });
    }

    public doUpdateViews(name:string,val:any){
    //  array.filter((v, i, a) => v % 2 == 0).forEach((v, i, a) => this.callback(v))

        let views =  this.entryToViews.get(name);
        views.forEach((v, i, a) => function(v){
            let v1 : IView = v;
            v1.modelChanged(val);
        });

        // let size: number  =.length, i: number =0;
        //
        // for(i=0;i<size;i++)
        // {
        //     let view : IView = this.entryToViews.get(name)[i];
        //     view.modelChanged(val);
        // }
    }

}