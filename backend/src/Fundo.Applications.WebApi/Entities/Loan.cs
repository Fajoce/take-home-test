using Fundo.Applications.WebApi.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Loan
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required(ErrorMessage = "Loan amount is required.")]
    [Range(0.01, double.MaxValue,
        ErrorMessage = "Loan amount must be greater than zero.")]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }

    [Required(ErrorMessage = "Current balance is required.")]
    [Range(0, double.MaxValue,
        ErrorMessage = "Current balance cannot be negative.")]
    [Column(TypeName = "decimal(18,2)")]
    public decimal CurrentBalance { get; set; }

    [Required(ErrorMessage = "Applicant name is required.")]
    [StringLength(100,
        MinimumLength = 3,
        ErrorMessage = "Applicant name must contain between 3 and 100 characters.")]
    public string ApplicantName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Loan status is required.")]
    [EnumDataType(typeof(LoanStatus))]
    public LoanStatus Status { get; set; }
}