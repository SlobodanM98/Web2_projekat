using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations
{
    public partial class addDocumentDevice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Team",
                table: "Documents",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PlanRada",
                table: "Documents",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SafetyOp",
                table: "Documents",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Documents",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "groundingRemoved",
                table: "Documents",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "readyForService",
                table: "Documents",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "tagsRemoved",
                table: "Documents",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "DocumentDevices",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DocumentID = table.Column<int>(nullable: false),
                    DeviceID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentDevices", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DocumentDevices");

            migrationBuilder.DropColumn(
                name: "SafetyOp",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "groundingRemoved",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "readyForService",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "tagsRemoved",
                table: "Documents");

            migrationBuilder.AlterColumn<string>(
                name: "Team",
                table: "Documents",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "PlanRada",
                table: "Documents",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
