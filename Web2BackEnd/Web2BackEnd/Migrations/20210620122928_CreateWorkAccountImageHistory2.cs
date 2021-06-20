using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations
{
    public partial class CreateWorkAccountImageHistory2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkAccounts_WorkAccountStatusHistory_WorkAccountStatusHistoryID",
                table: "WorkAccounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkAccountStatusHistory",
                table: "WorkAccountStatusHistory");

            migrationBuilder.RenameTable(
                name: "WorkAccountStatusHistory",
                newName: "WorkAccountStatusHistorys");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkAccountStatusHistorys",
                table: "WorkAccountStatusHistorys",
                column: "WorkAccountStatusHistoryID");

            migrationBuilder.CreateTable(
                name: "WorkAccountsImages",
                columns: table => new
                {
                    WorkAccountImageID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageID = table.Column<int>(nullable: false),
                    WorkAccountID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkAccountsImages", x => x.WorkAccountImageID);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_WorkAccounts_WorkAccountStatusHistorys_WorkAccountStatusHistoryID",
                table: "WorkAccounts",
                column: "WorkAccountStatusHistoryID",
                principalTable: "WorkAccountStatusHistorys",
                principalColumn: "WorkAccountStatusHistoryID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkAccounts_WorkAccountStatusHistorys_WorkAccountStatusHistoryID",
                table: "WorkAccounts");

            migrationBuilder.DropTable(
                name: "WorkAccountsImages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkAccountStatusHistorys",
                table: "WorkAccountStatusHistorys");

            migrationBuilder.RenameTable(
                name: "WorkAccountStatusHistorys",
                newName: "WorkAccountStatusHistory");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkAccountStatusHistory",
                table: "WorkAccountStatusHistory",
                column: "WorkAccountStatusHistoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkAccounts_WorkAccountStatusHistory_WorkAccountStatusHistoryID",
                table: "WorkAccounts",
                column: "WorkAccountStatusHistoryID",
                principalTable: "WorkAccountStatusHistory",
                principalColumn: "WorkAccountStatusHistoryID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
