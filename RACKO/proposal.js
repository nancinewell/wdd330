/* COLORS
    very light green: #ecfbc8       
    light green: #dcf69d        
    green: #ccf176
    dark green: #aed74d             
    very dark green: #92c027
    very light blue: #6179b3
    light blue: #3f5a9c
    blue: #254492
    dark blue: #163174
    very dark blue: #09205a
    very light orange: #ffd47c
    light orange: #e8b64e
    orange: #d99d23
    dark orange: #ac7911
    very dark orange: #855a00
*/
(function () {
    let swatches = document.querySelectorAll(".color-swatch");
    let colors = ["#ecfbc8", "#dcf69d", "#ccf176", "#aed74d", "#92c027","#6179b3", "#3f5a9c", "#254492", "#163174", "#09205a","#ffd47c", "#e8b64e", "#d99d23", "#ac7911", "#855a00"];
    let i = 0;
    for (swatch of swatches) {
        swatch.style.backgroundColor = colors[i];
        i++
    }


})()

