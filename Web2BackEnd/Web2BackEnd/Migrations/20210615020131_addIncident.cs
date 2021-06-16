using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations
{
    public partial class addIncident : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Incidents",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tip = table.Column<int>(nullable: false),
                    Prioritet = table.Column<int>(nullable: true),
                    Potvrdjen = table.Column<bool>(nullable: true),
                    Status = table.Column<string>(nullable: false),
                    ETA = table.Column<string>(nullable: false),
                    ATA = table.Column<string>(nullable: false),
                    VremeIncidenta = table.Column<string>(nullable: false),
                    ETR = table.Column<string>(nullable: false),
                    NivoNapona = table.Column<float>(nullable: false),
                    PVR = table.Column<string>(nullable: false),
                    Uzrok = table.Column<string>(nullable: true),
                    Poduzrok = table.Column<string>(nullable: true),
                    Konstrukcija = table.Column<string>(nullable: true),
                    Materijal = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incidents", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Incidents");
        }
    }
}
