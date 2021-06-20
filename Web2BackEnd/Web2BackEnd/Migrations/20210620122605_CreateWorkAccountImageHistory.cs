using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations
{
    public partial class CreateWorkAccountImageHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WorkAccountStatusHistoryID",
                table: "WorkAccounts",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "WorkAccountStatusHistory",
                columns: table => new
                {
                    WorkAccountStatusHistoryID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    date = table.Column<DateTime>(nullable: false),
                    ChangedBy = table.Column<string>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkAccountStatusHistory", x => x.WorkAccountStatusHistoryID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkAccounts_WorkAccountStatusHistoryID",
                table: "WorkAccounts",
                column: "WorkAccountStatusHistoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkAccounts_WorkAccountStatusHistory_WorkAccountStatusHistoryID",
                table: "WorkAccounts",
                column: "WorkAccountStatusHistoryID",
                principalTable: "WorkAccountStatusHistory",
                principalColumn: "WorkAccountStatusHistoryID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkAccounts_WorkAccountStatusHistory_WorkAccountStatusHistoryID",
                table: "WorkAccounts");

            migrationBuilder.DropTable(
                name: "WorkAccountStatusHistory");

            migrationBuilder.DropIndex(
                name: "IX_WorkAccounts_WorkAccountStatusHistoryID",
                table: "WorkAccounts");

            migrationBuilder.DropColumn(
                name: "WorkAccountStatusHistoryID",
                table: "WorkAccounts");
        }
    }
}
