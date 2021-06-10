using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations.ApplicationUser
{
    public partial class UpdateImageProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ProductImage_ImageProductId",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductImage",
                table: "ProductImage");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "ProductImage");

            migrationBuilder.AddColumn<int>(
                name: "ImageProductId",
                table: "ProductImage",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductImage",
                table: "ProductImage",
                column: "ImageProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ProductImage_ImageProductId",
                table: "AspNetUsers",
                column: "ImageProductId",
                principalTable: "ProductImage",
                principalColumn: "ImageProductId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ProductImage_ImageProductId",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductImage",
                table: "ProductImage");

            migrationBuilder.DropColumn(
                name: "ImageProductId",
                table: "ProductImage");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "ProductImage",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductImage",
                table: "ProductImage",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ProductImage_ImageProductId",
                table: "AspNetUsers",
                column: "ImageProductId",
                principalTable: "ProductImage",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
