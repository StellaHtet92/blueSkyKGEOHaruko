function layerCardGenerator(layerTitle,layerName,defaultCheck)
{
    var layerCard=`<div class="card-body layer-card">
    <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input layer-card-cb" id=${layerName} name=${layerTitle} ${defaultCheck}>
        <label class="custom-control-label" for=${layerName}>${layerTitle}</label>
    </div>    
    <div style="display: flex;">
        <label class="custom-control-label" for="opacity">Opacity: </label>
        <input type="range" class="form-control-range opacity" value="100" min="0" max="100" data-toggle="tooltip" title="Opacity"  code=${layerName} />  
    </div>            
</div>`
return layerCard;
}