using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoAppDataLayer.Models
{
    [Table("Usertask")]
    public class UserTask
    {
        
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, MinLength(5),MaxLength(500)]
        public string Title { get; set; } = null!;

        [MaxLength(500)]
        public string Description { get; set; } = null!;

        [Required]
        public DateTime CreatedOn { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required,ForeignKey("User")]
        public Guid UserId { get; set; }

        public User User { get; set; }=null!;
    }
}
