using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations
{
    public partial class addCall : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Calls",
                columns: table => new
                {
                    CallID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Reason = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(nullable: true),
                    Priority = table.Column<int>(nullable: false),
                    AddressID = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Calls", x => x.CallID);
                    table.ForeignKey(
                        name: "FK_Calls_Addresses_AddressID",
                        column: x => x.AddressID,
                        principalTable: "Addresses",
                        principalColumn: "AddressID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Calls_AddressID",
                table: "Calls",
                column: "AddressID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Calls");
        }
    }
}
