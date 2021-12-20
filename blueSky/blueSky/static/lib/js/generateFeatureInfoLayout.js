function generateFeatureInfoLayout(grayIndex)
{
    var level="";
    //reference from https://www.researchgate.net/figure/Standardized-Precipitation-Index-SPI-drought-categories_tbl1_279211956
    if(grayIndex>=2.00)
    {
        level="เปียกสุดๆ (Extremely Wet)";
    }
    else if(grayIndex>=1.50 && grayIndex <= 1.99)
    {
        level="เปียกอย่างแรง (Severely Wet)";
    }
    else if(grayIndex>=1.00 && grayIndex<=1.49)
    {
        level="เปียกปานกลาง (Moderately Wet)";
    }
    else if(grayIndex>=0 && grayIndex<=0.99)
    {
        level="เปียกเล็กน้อย (Mildly Wet)";
    }
    else if(grayIndex>=-0.99 && grayIndex<=0)
    {
        level="ภัยแล้งเล็กน้อย (Mild Drought)";
    }
    else if(grayIndex>=-1.49 && grayIndex<=-1.00)
    {
        level="ภัยแล้งปานกลาง (Moderate Drought)";
    }
    else if(grayIndex>=-1.99 && grayIndex<=-1.50)
    {
        level="ภัยแล้งรุนแรง (Severe Drought)";
    }
    else
    {
        level="ภัยแล้งรุนแรง (Extreme Drought)";
    }
var htmlContent=`<html>
      <head>
        <title>Standard Precipitaion Index</title>
      </head>
      <style type="text/css">
      table.featureInfo, table.featureInfo td, table.featureInfo th {
        border:1px solid #ddd;
        border-collapse:collapse;
        margin:0;
        padding:0;
        font-size: 90%;
        padding:.2em .1em;
      }
      table.featureInfo th {
          padding:.2em .2em;
        font-weight:bold;
        background:#eee;
      }
      table.featureInfo td{
        background:#fff;
      }
      table.featureInfo tr.odd td{
        background:#eee;
      }
      table.featureInfo caption{
        text-align:left;
        font-size:100%;
        font-weight:bold;
        padding:.2em .2em;
      }
      </style>
      <body>
      
    <table class="featureInfo">
      <caption class="featureInfo">Standard Precipitation Index</caption>
        <tr>
            <th >SPI Index</th>
            <th >Index Level</th>
        </tr>
    
        <tr>    
            <td>${grayIndex}</td>
            <td>${level}</td>
        </tr>
    </table>
    <br/>    
    </body>
</html>`;
return htmlContent;
}