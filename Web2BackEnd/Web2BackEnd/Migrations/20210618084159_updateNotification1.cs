using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations
{
    public partial class updateNotification1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Notifications");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "Notifications",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "Notifications");

            migrationBuilder.AddColumn<string>(
                name: "UserID",
                table: "Notifications",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
