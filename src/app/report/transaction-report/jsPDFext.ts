var jspdf = require("jspdf");
require("jspdf-autotable");
export class CustomJspdf{
    public jspdf: any;
    constructor(prop1: String, prop2: String){
        this.jspdf = new jspdf(prop1, prop2);
    }

    myText (txt, options, x, y){
        options = options ||{};
        /* Use the options align property to specify desired text alignment
         * Param x will be ignored if desired text alignment is 'center'.
         * Usage of options can easily extend the function to apply different text
         * styles and sizes
         */
        if( options.align == "center" ){
            // Get current font size
            var fontSize = this.jspdf.internal.getFontSize();

            // Get page width
            var pageWidth = this.jspdf.internal.pageSize.width;

            // Get the actual text's width
            /* You multiply the unit width of your string by your font size and divide
             * by the internal scale factor. The division is necessary
             * for the case where you use units other than 'pt' in the constructor
             * of jsPDF.
             */
            var txtWidth = this.jspdf.getStringUnitWidth(txt)*fontSize/this.jspdf.internal.scaleFactor;
            // Calculate text's x coordinate
            x = ( pageWidth - txtWidth ) / 2;
        } else if(options.align == "right"){
            var fontSize = this.jspdf.internal.getFontSize();

            // Get page width
            var pageWidth = this.jspdf.internal.pageSize.width;

            // Get the actual text's width
            /* You multiply the unit width of your string by your font size and divide
             * by the internal scale factor. The division is necessary
             * for the case where you use units other than 'pt' in the constructor
             * of jsPDF.
             */
            txtWidth = this.jspdf.getStringUnitWidth(txt)*fontSize/this.jspdf.internal.scaleFactor;
            // Calculate text's x coordinate
            x = ( pageWidth - txtWidth - 40);
        }
        // Draw text at x,y
        this.jspdf.text(txt,x,y);
    }
    textInWindow (txt, x, y,windowWidth) {

        /* Use the options align property to specify desired text alignment
         * Param x will be ignored if desired text alignment is 'center'.
         * Usage of options can easily extend the function to apply different text
         * styles and sizes
         */
        // Get current font size
        var fontSize = this.jspdf.internal.getFontSize();
        // Get page width
        //var pageWidth = this.internal.pageSize.width;
        // Get the actual text's width
        /* You multiply the unit width of your string by your font size and divide
         * by the internal scale factor. The division is necessary
         * for the case where you use units other than 'pt' in the constructor
         * of jsPDF.
         */
        var txtWidth = this.jspdf.getStringUnitWidth(txt)*fontSize/this.jspdf.internal.scaleFactor;
        // Calculate text's x coordinate
        x = ( windowWidth - txtWidth ) / 2 + 40;
        // Draw text at x,y
        this.jspdf.text(txt,x,y);
    }

    text(txt,x,y){
        this.jspdf.text(txt,x,y)
    }

}