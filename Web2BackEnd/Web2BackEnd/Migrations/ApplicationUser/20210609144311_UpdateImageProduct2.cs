using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations.ApplicationUser
{
    public partial class UpdateImageProduct2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ProductImage_ImageProductId",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductImage",
                table: "ProductImage");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ImageProductId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ImageProductId",
                table: "ProductImage");

            migrationBuilder.DropColumn(
                name: "ImageProductId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "ProductImageId",
                table: "ProductImage",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "ImageProductImageId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductImage",
                table: "ProductImage",
                column: "ProductImageId");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ProductImage_ImageProductImageId",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductImage",
                table: "ProductImage");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ImageProductImageId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProductImageId",
                table: "ProductImage");

            migrationBuilder.DropColumn(
                name: "ImageProductImageId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "ImageProductId",
                table: "ProductImage",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "ImageProductId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductImage",
                table: "ProductImage",
                column: "ImageProductId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ImageProductId",
                table: "AspNetUsers",
                column: "ImageProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ProductImage_ImageProductId",
                table: "AspNetUsers",
                column: "ImageProductId",
                principalTable: "ProductImage",
                principalColumn: "ImageProductId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
