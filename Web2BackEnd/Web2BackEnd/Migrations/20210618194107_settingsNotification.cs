using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations
{
    public partial class settingsNotification : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "callIcon",
                table: "Settings",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "incidentIcon",
                table: "Settings",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "teamIcon",
                table: "Settings",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "callIcon",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "incidentIcon",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "teamIcon",
                table: "Settings");
        }
    }
}
