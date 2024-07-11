using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoAppDataLayer.Models;

namespace TodoAppServices.DTOs
{
    public class TaskDTO
    {
        public int? Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public DateTime CreatedOn { get; set; }

        public bool IsActive { get; set; }

    }
}
