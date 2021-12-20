function contentGenerator(name,description,url)
{
    var download =`<div class="col-xs-6 col-md-4 col-lg-2">
                   
<!--for downloadable Map-->
<div class="card">
    <img class="card-img-top" src=${url} alt="Map Image">
    <div class="card-body" style="width: 100%;">
    <h5 class="card-title">${description}</h5>                            
    <a href=${url} download>Download File</a>
    </div>
</div>

</div>`;
return download;
}
