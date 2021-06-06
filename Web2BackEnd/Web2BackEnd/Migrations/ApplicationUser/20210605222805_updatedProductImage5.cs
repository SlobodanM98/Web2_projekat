using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations.ApplicationUser
{
    public partial class updatedProductImage5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "ProductImage");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "ProductImage",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
