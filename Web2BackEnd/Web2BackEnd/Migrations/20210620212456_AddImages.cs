using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations
{
    public partial class AddImages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DocumentImages",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImagePath = table.Column<string>(nullable: false),
                    Image = table.Column<byte[]>(nullable: false),
                    SafetyDocumentID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentImages", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DocumentImages_Documents_SafetyDocumentID",
                        column: x => x.SafetyDocumentID,
                        principalTable: "Documents",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "IncidentImages",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImagePath = table.Column<string>(nullable: false),
                    Image = table.Column<byte[]>(nullable: false),
                    IncidentID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncidentImages", x => x.ID);
                    table.ForeignKey(
                        name: "FK_IncidentImages_Incidents_IncidentID",
                        column: x => x.IncidentID,
                        principalTable: "Incidents",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DocumentImages_SafetyDocumentID",
                table: "DocumentImages",
                column: "SafetyDocumentID");

            migrationBuilder.CreateIndex(
                name: "IX_IncidentImages_IncidentID",
                table: "IncidentImages",
                column: "IncidentID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DocumentImages");

            migrationBuilder.DropTable(
                name: "IncidentImages");
        }
    }
}
