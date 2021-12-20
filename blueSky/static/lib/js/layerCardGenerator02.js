function layerCardGenerator02(layerTitle,layerName,defaultCheck)
{
    //if (layerName === "blueSky:")
    var layerCard=`<div class="card-body layer-card">
    <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input layer-card-cb" id=${layerName} name=${layerTitle} ${defaultCheck}>
        <label class="custom-control-label" for=${layerName}>${layerTitle}</label>
    </div>             
</div>`
return layerCard;
}