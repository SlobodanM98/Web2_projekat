using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations
{
    public partial class addIncidentCall : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TeamID",
                table: "Incidents",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "IncidentCalls",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IncidentID = table.Column<int>(nullable: false),
                    CallID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncidentCalls", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "IncidentDevices",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IncidentID = table.Column<int>(nullable: false),
                    DeviceID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncidentDevices", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Incidents_TeamID",
                table: "Incidents",
                column: "TeamID");

            migrationBuilder.AddForeignKey(
                name: "FK_Incidents_Teams_TeamID",
                table: "Incidents",
                column: "TeamID",
                principalTable: "Teams",
                principalColumn: "TeamID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Incidents_Teams_TeamID",
                table: "Incidents");

            migrationBuilder.DropTable(
                name: "IncidentCalls");

            migrationBuilder.DropTable(
                name: "IncidentDevices");

            migrationBuilder.DropIndex(
                name: "IX_Incidents_TeamID",
                table: "Incidents");

            migrationBuilder.DropColumn(
                name: "TeamID",
                table: "Incidents");
        }
    }
}
