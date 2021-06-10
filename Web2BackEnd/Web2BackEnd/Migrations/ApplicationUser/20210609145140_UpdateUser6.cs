using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations.ApplicationUser
{
    public partial class UpdateUser6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ProductImage_ImageProductImageId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ImageProductImageId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ImageProductImageId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "ProductImageId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ProductImageId",
                table: "AspNetUsers",
                column: "ProductImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ProductImage_ProductImageId",
                table: "AspNetUsers",
                column: "ProductImageId",
                principalTable: "ProductImage",
                principalColumn: "ProductImageId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ProductImage_ProductImageId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ProductImageId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProductImageId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "ImageProductImageId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ImageProductImageId",
                table: "AspNetUsers",
                column: "ImageProductImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ProductImage_ImageProductImageId",
                table: "AspNetUsers",
                column: "ImageProductImageId",
                principalTable: "ProductImage",
                principalColumn: "ProductImageId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
