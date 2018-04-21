module.exports = {
    generate_html(groups)
    {
        var PageHeader = "<table>";
        var MidString = "";
        for (i = 0; i < groups.length; i++)
        {
            MidString += "<tr>";
            MidString += "<td>Group" + i  + " " + "</td>";
            for (j = 0; j< groups[i].length;j++)
            {
                MidString += "<td>" + groups[i][j].id + "</td>";
            }
            MidString += "</tr>";
        }
        var PageFooter = "</table>"
        return PageHeader + MidString + PageFooter;
    }
}