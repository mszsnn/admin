import React from 'react';
import E from 'wangeditor';
class Editor extends React.Component{
    componentDidMount(){
        var editor=new E(this.el);
        var that=this;
        this.e=editor;
        editor.customConfig.uploadImgShowBase64 = true;
        // 隐藏“网络图片”tab
        editor.customConfig.showLinkImg = false;
        // 上传图片到服务器
        editor.customConfig.onchange=function (html) {
            editor.change();
            that.props.onChange(html);
        }  
        editor.create();
    }
    componentDidUpdate(){
        if(this.e.txt.html()==='<p><br></p>'){
            this.e.txt.html(this.props.content);
        }else{
            return;
        }    
    }
    render(){
        return(
            <div ref={(el)=>this.el=el} id="editor">
               
            </div>
        )
    }
}

export default Editor;