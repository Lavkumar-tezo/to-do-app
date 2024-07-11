using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoAppDataLayer.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required,MinLength(5),MaxLength(50),EmailAddress]
        public string Name { get; set; } = null!;

        [Required,MaxLength(100),MinLength(8)]
        public string Password {  get; set; } = null!;

        public List<UserTask> Tasks { get; set; }= new List<UserTask>();
    }
}
