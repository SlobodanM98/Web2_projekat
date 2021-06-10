using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations.ApplicationUser
{
    public partial class UpdateUser5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminConfirme",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<bool>(
                name: "AdminConfirme",
                table: "AspNetUsers",
                type: "bit",
                nullable: true);
        }
    }
}
