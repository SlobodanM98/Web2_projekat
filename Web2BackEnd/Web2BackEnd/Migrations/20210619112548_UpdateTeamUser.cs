using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations
{
    public partial class UpdateTeamUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserID",
                table: "TeamUsers",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "UserID",
                table: "TeamUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
